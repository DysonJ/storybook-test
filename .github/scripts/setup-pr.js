module.exports = ({github, context, core}) => {
  const creator = context.payload.sender.login;
  const owner = context.repo.owner
  const repo = context.repo.repo
  const issue_number = context.issue.number
  const ticket_number = context.payload.pull_request.title.match(/(?<=DESC?.)\d{4}/gi)?.[0];

  console.log(context)

  console.log('-----')
  console.log(github)

  if(ticket_number){
    let body = `[**DESC-${ticket_number}**](https://pepsico-ecomm.atlassian.net/browse/DESC-${ticket_number})`;
    if(context.payload.pull_request.body){
      body += `\n${context.payload.pull_request.body}`
    }

    github.rest.pulls.update({
      owner,
      repo,
      pull_number: issue_number,
      body
    })
  }

  if(!context.payload.pull_request.assignees.includes(creator)){
    github.rest.issues.addAssignees({
      owner,
      repo,
      issue_number,
      assignees: [creator]
    })
  }
}
