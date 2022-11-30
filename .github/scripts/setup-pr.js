module.exports = async ({github, context, core}) => {
  //console.log(JSON.stringify(context));
  const creator = context.payload.sender.login;
  const owner = context.repo.owner
  const repo = context.repo.repo
  const issue_number = context.issue.number

  //await github.request(`PATCH /repos/${context.repo.owner}/${context.repo.repo}/pulls/${context.payload.pull_request.number}`, {body:"hello world"});
  await github.rest.pulls.update({
    owner,
    repo,
    pull_number: issue_number,
    body: `[**DESC-1234**](https://pepsico-ecomm.atlassian.net/browse/DESC-6039)\n` + context.payload.pull_request.body
  })

  await github.rest.issues.addAssignees({
    owner,
    repo,
    issue_number,
    assignees: [creator]
  })



  await github.rest.issues.createComment({
    issue_number,
    owner,
    repo,
    body: `title: ${context.payload.pull_request.title} by ${creator}`
  })
}
