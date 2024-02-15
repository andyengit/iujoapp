import pdf from "html-pdf";
import fs from "fs"

const genHTML = ({ report: data, logs }, dstart,dend) => {
  try {
    const date = new Date()
    let text = fs.readFileSync('public/base/about.txt', { encoding: 'utf8' })
    text = text.split("\|")

    const header = `
<html>
  <head>
  <meta charset="utf-8">
  <title>PDF Result Template</title>
  <style>
  h3{
  margin-top: 12px;
  }
  table{
    width: 100%;
    border-bottom: 1px solid #212121;
  }
  thead{
    background-color: #212121;
    color: white;
  }
  .headerp{
    text-align: left;
    margin: 0;
    padding: 0;
    font-size: 10px;
    color: #212121;
  }
  p{
    margin: 0;
    font-size: 12px;
  }
  *{
    font-size: 12px;
  }
  .data{
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #212121;
  }
  td{
    text-align: center;
  }
  </style>
  </head>
  <body>
    <table>
      <tr>
        <td>
        <h3>${text[0]}</h3>
        </td>
        <td>
          <p class="headerp">Fecha: ${date.toLocaleString()}</p> 
          <p class="headerp">Dirección: ${text[1]}</p>
          <p class="headerp">Correo: ${text[4]}</p>
          <p class="headerp">Desde: ${dstart}  -  Hasta: ${dend}</p>
        </td>
      </tr>
    </table>
  `
    const getReportTemplate = () => {
      if (data.length === 0) {
        return ""
      }

      return `
      <div class="data">
        <p>Publicaciones creadas: ${data['POST']['CREATE'] || 0}</p>
        <p>Publicaciones editadas: ${data['POST']['UPDATE'] || 0}</p>
        <p>Publicaciones eliminadas: ${data['POST']['DELETE'] || 0}</p>
      </div>
      <div class="data">
        <p>Usuarios creados: ${data['USUARIO']['CREATE'] || 0}</p>
        <p>Usuarios editados: ${data['USUARIO']['UPDATE'] || 0}</p>
        <p>Usuarios eliminados: ${data['USUARIO']['DELETE'] || 0}</p>
      </div>
      `
    }


    const logsReport = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>MODULO</th>
          <th>ACCION</th>
          <th>ENTIDAD</th>
          <th>USUARIO</th>
          <th>FECHA</th>
        </tr>
      </thead>
      <tbody>
        
      ${logs.map(({ dataValues: el }) => `
        <tr>
          <td>${el.id}</td>
          <td>${el.module}</td>
          <td>${el.event}</td>
          <td>${el.entity}</td>
          <td>@${el.User.username}</td>
          <td>${el.createdAt.toString().slice(4, 15)}</td>
        </tr>
        `)}
      </tbody>
    </table>
  `


    const footer = `
    <div id="pageFooter" style="border-top: 1px solid #ddd; padding-top: 5px;">
      <p style="color: #666; width: 70%; margin: 0; padding-bottom: 5px; text-align: let; font-family: sans-serif; font-size: .65em; float: left;">
        <a href="http://localhost:3000" target="_blank">${text[0]} - CMS SYSTEM</a></p>
        <p style="color: #666; margin: 0; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .65em">Página {{page}} de {{pages}}</p>
    </div>
  </body>
</html>
    `

    const content = header + getReportTemplate() + logsReport + footer
    const options = {
      format: "Letter",
      base: "file:///app/public/base/",
      border: "0.2in"
    }
    pdf.create(content, options).toFile("./public/base/report.pdf", function(err, res) {
      if (err) {
        console.log(err)
      } else {
        console.log(res)
      }
    });
  } catch (e) {
    console.log(e)
  }

}


export default genHTML
