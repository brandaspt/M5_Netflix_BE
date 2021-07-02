import PdfPrinter from "pdfmake"
export const mediaPDFStream = (mediaObj, imageStr) => {
  const fonts = {
    Roboto: {
      normal: "src/lib/fonts/Roboto/Roboto-Regular.ttf",
      bold: "src/lib/fonts/Roboto/Roboto-Bold.ttf",
      italics: "src/lib/fonts/Roboto/Roboto-Italic.ttf",
      bolditalics: "src/lib/fonts/Roboto/Roboto-Italic.ttf",
    },
  }

  const printer = new PdfPrinter(fonts)

  const docDefinition = {
    content: [
      { text: mediaObj.Title, fontSize: 28, alignment: "center", margin: [0, 0, 0, 10] },
      { image: imageStr, alignment: "center", fit: [400, 400], margin: [0, 0, 0, 10] },
      { text: `Year: ${mediaObj.Year}`, margin: [0, 0, 0, 20] },
      { text: `imdbID: ${mediaObj.imdbID}`, margin: [0, 0, 0, 20] },
      { text: `Type: ${mediaObj.Type}`, margin: [0, 0, 0, 20] },
    ],
  }

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {})
  pdfReadableStream.end()
  return pdfReadableStream
}
