module.exports = async ({github, context}) => {
  console.log(JSON.stringify(context));
  const creator = context.payload.sender.login;

  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: `title: ${context.payload.pull_request.title} by ${creator}`
  })
}
