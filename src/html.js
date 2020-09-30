function getSrcDoc({ babelOutput, error, css }) {
    if (error) {
        return `<html lang="en">
        <head>
            <meta charset="utf-8">
        </head>
    
        <body>
           <pre>
           <code>
            ${error}
            </code>
           </pre>
        </body>
    </html>`;
    }
    return `<html lang="en">
    <head>
        <meta charset="utf-8">
        <style type="text/css">
            ${css}
        </style>
    </head>

    <body>
        <div id="car"></div>
       
        <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
        <script>
        try {
            ${babelOutput}
        } catch (e) {
            const body = document.getElementsByTagName("body")[0];
            const pre = document.createElement("pre");
            pre.innerHTML = e;
            body.appendChild(pre);
        }
        </script>
    </body>
</html>`;
};

export {
    getSrcDoc
}