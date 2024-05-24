import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_KEY);

export default async function handler(req, res) {
    const { 'image-gallery': imageGallery, uid, ...sendFields } = req.body;

// Now, `sendFields` contains all fields from req.body except `uid` and `image-gallery`

    try {
        const messageContent = Object.keys(sendFields).map((key) => {
            return `<p>${key}: ${req.body[key]}</p>`;
        }).join("");


        await sendgrid.send({
            to: 'info@hmbmarina.com', // Your email where you'll receive emails
            from: "website@hmbmarina.com", // your website email address here
            subject: `[Lead from website] : ${req.body['boat-name']}`,
            replyTo: req.body.email,
            html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <title>The HTML5 Herald</title>
                    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                </head>
                <body>
                    <div class="container" style="margin-left: 20px;margin-right: 20px;">
                        <h3>You've got a new mail from ${req.body['full-name']}, their email is: ✉️${req.body.email} </h3>
                        <div style="font-size: 16px;">
                            ${messageContent}
                        </div>
                        <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">
                            Regards<br>${req.body['full-name']}<br>
                        </p>
                    </div>
                </body>
                </html>`
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ error: "" });
}
