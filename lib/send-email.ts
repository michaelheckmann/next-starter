import { createTransport } from "nodemailer"

type SendEmail = { url: string; email: string; from: string; server: string }

export const sendEmail = async ({ url, email, from, server }: SendEmail) => {
  const { host } = new URL(url)
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(server)
  const result = await transport.sendMail({
    to: email,
    from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host }),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    return {
      success: false,
      error: `Email(s) (${failed.join(", ")}) could not be sent`,
    }
  } else {
    return { success: true }
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string; host: string }) {
  const { url, host } = params

  const escapedHost = host.replace(/\./g, "&#8203;.")

  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: "transparent",
    buttonBorder: "#1f2937",
    buttonText: "#1f2937",
  }

  return `
      <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <body style="background: ${color.background};">
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: ${
          color.mainBackground
        }; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${
              color.text
            };">
            Sign in to <strong>${escapedHost}</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${
                  color.buttonBackground
                }"><a href="${url}"
                    target="_blank"
                    style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${
                      color.buttonText
                    }; text-decoration: none; border-radius: 999px; padding: 10px 30px; border: 1px solid ${
    color.buttonBorder
  }; display: inline-block; font-weight: bold;">Sign
                    in</a></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 5px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
              color.text
            };">
            Alternativly, copy and paste the following token in the input field on ${escapedHost}:
          </td>
        </tr>
        <tr>
        <td align="center"
        style="font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: #2680C2; word-break: break-all;">
        ${extractToken(url)}
      </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: #8c8c8c;">
            If you did not request this email you can safely ignore it.
          </td>
        </tr>
      </table>
    </body>
    `
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}

function extractToken(url: string): string | null {
  const tokenRegExp = /token=([\w-]+)/
  const match = url.match(tokenRegExp)
  if (match && match[1]) {
    return match[1]
  } else {
    return null
  }
}
