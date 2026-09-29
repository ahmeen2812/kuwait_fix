import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, email, service, area, urgency, notes } = data;

    const recipient = process.env.ADMIN_EMAIL || "acmaintenance96@gmail.com";
    const host = process.env.EMAIL_SERVER_HOST;
    const user = process.env.EMAIL_SERVER_USER;
    const pass = process.env.EMAIL_SERVER_PASS;

    const emailSubject = `🚨 [طلب صيانة جديد] من ${name} - ${service} (${area})`;

    const htmlBody = `
      <div dir="rtl" style="font-family: Arial, sans-serif; background-color: #F8FAFC; padding: 30px; color: #1E293B;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          
          <div style="border-bottom: 3px solid #2563EB; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="color: #0F172A; margin: 0; font-size: 22px;">🔧 طلب صيانة جديد - كويت فيكس</h2>
            <p style="color: #64748B; margin: 5px 0 0; font-size: 13px;">تم استلام حجز صيانة فوري من الموقع الإلكتروني</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; color: #64748B; width: 35%;">اسم العميل:</td>
              <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; font-weight: bold; color: #0F172A;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; color: #64748B;">رقم الهاتف:</td>
              <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; font-weight: bold; color: #2563EB;">
                <a href="tel:${phone}" style="color: #2563EB; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; color: #64748B;">البريد الإلكتروني:</td>
              <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; font-weight: bold; color: #0F172A;">
                <a href="mailto:${email}" style="color: #0F172A; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; color: #64748B;">نوع الجهاز / الخدمة:</td>
              <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; font-weight: bold; color: #0F172A;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; color: #64748B;">المنطقة بالكويت:</td>
              <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; font-weight: bold; color: #0F172A;">${area}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; color: #64748B;">موعد الزيارة المفضل:</td>
              <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; font-weight: bold; color: #F59E0B;">${urgency}</td>
            </tr>
          </table>

          <div style="background-color: #F8FAFC; border-right: 4px solid #2563EB; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <span style="display: block; font-weight: bold; color: #475569; margin-bottom: 5px; font-size: 13px;">تفاصيل العطل:</span>
            <p style="margin: 0; color: #1E293B; line-height: 1.6; font-size: 14px;">"${notes || "لا توجد ملاحظات إضافية"}"</p>
          </div>

          <div style="text-align: center; border-top: 1px solid #E2E8F0; padding-top: 15px; font-size: 12px; color: #94A3B8;">
            كويت فيكس • صيانة الأجهزة المنزلية والتكييف في الكويت • إشعار فوري
          </div>
        </div>
      </div>
    `;

    // Send email via SMTP if configured
    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port: Number(process.env.EMAIL_SERVER_PORT) || 465,
        secure: true,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: `"Kuwait Fix Bookings" <${user}>`,
        to: recipient,
        replyTo: email,
        subject: emailSubject,
        html: htmlBody,
      });
    } else {
      // Console fallback when testing without SMTP setup
      console.log("==> [New Contact Lead Received - Logged] <==");
      console.log({ recipient, name, phone, email, service, area, urgency, notes });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}