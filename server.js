const express = require("express")
const cors = require('cors')
const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const { readFileSync, writeFileSync, unlinkSync } = require("fs")
const app = express();

app.use(express.json());

app.use(cors())

app.post("/generatePDF", async (req, res) => {
    try {
        const { username } = req.body;
        const document = await PDFDocument.load(readFileSync("./certificate.pdf"));
        const pages = document.getPages();
        const firstPage = pages[0];
        // const fontBytes = readFileSync("./Sanchez-Regular.ttf")
        // Draw a string of text diagonally across the first page
        // const SanChezFont = await document.embedFont(fontBytes);
        firstPage.drawText(username, {
            x: 300,
            y: 270,
            size: 25,
            // font: SanChezFont,
            color: rgb(0.0, 0.0, 0.0),
        });
        const pdfBytes = await document.save()
        writeFileSync("./newCertificate.pdf", pdfBytes)
        res.download(__dirname + "/newCertificate.pdf");
    } catch (err) {
        res.json(err.msg);
    }
})

app.listen(4000, () => {
    console.log("listening at port 4000...")
});