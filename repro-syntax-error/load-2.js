try {
  await import("@mui/material/Button/index.js")
} catch(err) {
  console.log(
    [
      '{',
      `  message: ${JSON.stringify(err.message)},`,
      `  code: ${JSON.stringify(err.code)},`,
      '  stack: `\n' + err.stack + '\n`',
      '}'
    ].join('\n')
  )
}