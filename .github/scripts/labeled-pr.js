const http = require('node:http');
module.exports = ({github, context, core}) => {
// const run = () => {
  // const creator = context.payload.sender.login;
  // const owner = context.repo.owner
  // const repo = context.repo.repo
  // const issue_number = context.issue.number
  // const ticket_number = context.payload.pull_request.title.match(/(?<=DESC?.)\d{4}/gi)?.[0];

  //console.log(context)
  //console.log('-----')
  //console.log(github)

  const slack = http.request({
    url:'https://hooks.slack.com/services/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',
    method:'POST'
  }, (res) => {
    res.on('error', (e) => console.log(e))
    res.on('data', (chunck) => console.log(chunk))
    res.on('end', () => console.log('complete'))
  })

  slack.write(JSON.stringify({"text":'hello world?'}))

  console.log('sent')

}
