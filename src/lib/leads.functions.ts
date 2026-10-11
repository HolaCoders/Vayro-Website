import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const PRESUPUESTOS = [
  "Menos de $500 USD",
  "$500 a $1,000 USD",
  "$1,000 a $2,500 USD",
  "$2,500 a $5,000 USD",
  "Más de $5,000 USD",
] as const;

export const FACTURACIONES = [
  "Menos de 100,000 pesos al mes",
  "100,000 a 300,000 pesos al mes",
  "300,000 a 600,000 pesos al mes",
  "600,000 a 1,000,000 pesos al mes",
  "Más de 1,000,000 de pesos al mes",
] as const;

export const HORAS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"] as const;

const schema = z.object({
  nombre: z.string().trim().min(1).max(60),
  apellido: z.string().trim().min(1).max(60),
  correo: z.string().trim().email().max(255),
  telefono: z.string().trim().min(5).max(30),
  tipo: z.string().trim().min(1).max(60),
  mensaje: z.string().trim().min(1).max(1000),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  hora: z.enum(HORAS),
  presupuesto: z.enum(PRESUPUESTOS),
  facturacion: z.enum(FACTURACIONES),
});

const CALENDAR_ID = "trabajopersonal460@gmail.com";
const TIMEZONE = "America/Santo_Domingo";
const GATEWAY = "https://connector-gateway.lovable.dev";

function addOneHour(fecha: string, hora: string) {
  const d = new Date(`${fecha}T${hora}:00Z`);
  d.setUTCHours(d.getUTCHours() + 1);
  return d.toISOString().slice(0, 19);
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const sheetsKey = process.env["GOOGLE_SHEETS_API_KEY"];
    const calendarKey = process.env["GOOGLE_CALENDAR_API_KEY"];
    const sheetId = process.env["GOOGLE_SHEET_ID"];
    if (!lovableKey || !sheetsKey || !calendarKey || !sheetId) {
      throw new Error("La conexión con Google aún no está configurada.");
    }

    // Columnas de la hoja (A–N). K = Presupuesto Disponible, N = Nivel de Facturación Mensual.
    const row = [
      new Date().toISOString(), // A Fecha de envío
      data.nombre, // B
      data.apellido, // C
      data.correo, // D
      data.telefono, // E
      data.tipo, // F
      data.mensaje, // G Desafío principal
      data.fecha, // H Fecha de la cita
      data.hora, // I Hora de la cita
      "", // J
      data.presupuesto, // K Presupuesto Disponible
      "", // L
      "", // M
      data.facturacion, // N Nivel de Facturación Mensual
    ];

    const sheetRes = await fetch(
      `${GATEWAY}/google_sheets/v4/spreadsheets/${sheetId}/values/A:N:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": sheetsKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
      },
    );
    if (!sheetRes.ok) {
      const body = await sheetRes.text();
      console.error(`Sheets append failed [${sheetRes.status}]: ${body}`);
      throw new Error("No pudimos enviar tu solicitud. Intenta de nuevo.");
    }

    const resumen = data.mensaje.length > 300 ? `${data.mensaje.slice(0, 297)}...` : data.mensaje;
    const calRes = await fetch(
      `${GATEWAY}/google_calendar/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?sendUpdates=all`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": calendarKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: `${data.nombre} ${data.apellido}`,
          description: `Desafío principal: ${resumen}`,
          start: { dateTime: `${data.fecha}T${data.hora}:00`, timeZone: TIMEZONE },
          end: { dateTime: addOneHour(data.fecha, data.hora), timeZone: TIMEZONE },
          attendees: [{ email: data.correo, displayName: `${data.nombre} ${data.apellido}` }],
        }),
      },
    );
    if (!calRes.ok) {
      const body = await calRes.text();
      console.error(`Calendar insert failed [${calRes.status}]: ${body}`);
      return { ok: true, calendar: false };
    }
    return { ok: true, calendar: true };
  });
