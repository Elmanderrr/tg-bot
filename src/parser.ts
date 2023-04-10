export function parseMessage(msg: string) {
  const parsed = msg.match(/\[.+?\]/g).map(str => str.replace(/[\[\]]/g, '')) || [];
  console.log(parsed)
  const [ type, token, result ] = parsed;
  if(parsed?.length >= 2) {
    console.log(type, token, result)
  }
}
