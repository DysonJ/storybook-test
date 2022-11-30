module.exports = ({github, context, core}) => {
  const creator = context.payload.sender.login;
  const owner = context.repo.owner
  const repo = context.repo.repo
  const issue_number = context.issue.number
  const ticket_number = context.payload.pull_request.title.match(/(?<=DESC?.)\d{4}/gi)?.[0];

  console.log(context)
  console.log('-----')
  console.log(github)

  github.request('POST https://hooks.slack.com/services/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', {
    message:'test'
  })
}
