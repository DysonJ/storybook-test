const https = require('https');
module.exports = ({github, context}) => {
  const owner = context.repo.owner
  const repo = context.repo.repo
  const creator = context.payload.pull_request.user.login;
  const issue_number = context.issue.number
  const ticket_number = context.payload.pull_request.title.match(/(?<=DESC?.)\d{4}/gi)?.[0];

  const reviewers = context.payload.pull_request.requested_reviewers

  github.rest.pulls.requestReviewers({
    owner,
    repo,
    pull_number: issue_number,
    reviewers:['happy']
  })
  
  const header = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*Ready for Review* :tada: \n DESC-1234 This is a description of the thing"
    }
  }


  const details = {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*PR:* <https://github.com/pepsico-ecommerce/ecomm-engine-frontend/pull/${issue_number}|${issue_number}>`
      }
    ]
  }

  if(ticket_number){
    details.fields.push({
      type: "mrkdwn",
      text: `*Jira:* <https://pepsico-ecomm.atlassian.net/browse/DESC-${ticket_number}|DESC-${ticket_number}>`
    })
  }

  const author = {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `*Author*: ${creator}`
      }
    ]
  }

  let body = ''
  const slack = https.request({
    protocol: 'https:',
    hostname:'hooks.slack.com',
    port: 443,
    method:'POST',
    path:`/services/${process.env.SLACK_WEBHOOK_PATH}`,
    headers: {
      'Content-Type': 'application/json',
    }
  }, (res) => {
    res.on('error', (e) => console.log(e))
    res.on('data', (chunk) => body += chunk.toString('utf8'))
    res.on('end', () => console.log(body))
  })

  slack.write(JSON.stringify({ "blocks": [header, details, author]}))
  slack.end()
}
