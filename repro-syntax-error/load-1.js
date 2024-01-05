try {
  // Preamble *not* added to err.stack
  await import('./syntax-error.js')
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
