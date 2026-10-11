import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().trim().min(1).max(100),
  correo: z.string().trim().email().max(255),
  telefono: z.string().trim().min(5).max(30),
  tipo: z.string().trim().min(1).max(60),
  mensaje: z.string().trim().max(1000).optional().default(""),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const sheetsKey = process.env["GOOGLE_SHEETS_API_KEY"];
    const sheetId = process.env["GOOGLE_SHEET_ID"];
    if (!lovableKey || !sheetsKey || !sheetId) {
      throw new Error("La conexión con Google Sheets aún no está configurada.");
    }
    const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${sheetId}/values/A:F:append?valueInputOption=USER_ENTERED`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": sheetsKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[new Date().toISOString(), data.nombre, data.correo, data.telefono, data.tipo, data.mensaje]],
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Sheets append failed [${res.status}]: ${body}`);
      throw new Error("No pudimos enviar tu solicitud. Intenta de nuevo.");
    }
    return { ok: true };
  });
