module.exports = async ({github, context, core}) => {
  //console.log(JSON.stringify(context));
  const creator = context.payload.sender.login;

  //await github.request(`PATCH /repos/${context.repo.owner}/${context.repo.repo}/pulls/${context.payload.pull_request.number}`, {body:"hello world"});
  await github.rest.pulls.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.pull_request.number,
    body: context.payload.pull_request.body + `\n---\n[DESC-1234](https://pepsico-ecomm.atlassian.net/browse/DESC-6039)`
  })

  console.log(context.payload.pull_request.number)
  console.log(context.issue.number)


  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: `title: ${context.payload.pull_request.title} by ${creator}`
  })
}
