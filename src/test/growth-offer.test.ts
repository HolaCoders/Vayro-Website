import { describe, expect, it } from 'vitest';
import { GROWTH_PILOT, WHATSAPP_NUMBER } from '@/lib/growth-offer';
describe('Growth pilot business rules', () => {
  it('charges US$200 in professional fees', () => { expect(GROWTH_PILOT.feeUsd).toBe(200); });
  it('provides a 30 day pilot', () => { expect(GROWTH_PILOT.durationDays).toBe(30); });
  it('bills per project', () => { expect(GROWTH_PILOT.billing).toBe('project'); });
  it('includes the six requested deliverables', () => { expect(GROWTH_PILOT.deliverables.map(d => d.id)).toEqual(['audit','strategy','meta-campaign','capture','prospects','optimization']); });
  it('uses the supplied Dominican WhatsApp number', () => { expect(WHATSAPP_NUMBER).toBe('18098497534'); });
});
