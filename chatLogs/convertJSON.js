// Read chat-logs.json and convert it to a JSON file

const fs = require('fs');
const path = require('path');

console.log('Opening conversations.json...');
const chatLogs = require('./conversations.json');
console.log('Opening chat-ui-history.json...');
const chatLogsUI = require('./chat-ui-history.json').history;
const targetIdsString = "1affa78c-7369-42f0-9c3e-a2fa8dbf0388,25fea537-47d8-437d-aa17-cb5c755e2349,99a18d5d-be07-4ca5-92b5-2706cd992ae6,75f44a98-91c8-43c8-b418-cc671944964c,34b09739-c95a-4516-8201-87281f1fd502,22c19f7e-bd53-41e4-aaeb-6ee57047d627,d5132e4c-02b3-4876-b2ec-ed9faa65aff8,6bf98b50-eb22-44fa-b189-c505cd8cb868,1f72358d-2102-4d5b-b9d8-c0882fdc2930,d99d54a4-23e8-4060-9477-19b784b83bfa,d86c0fc3-e85e-46fe-a664-97a33c994b4e,9575c80a-4d41-4eb3-8787-70909b1d00bf,52d35b50-61df-4ec1-9bb9-d1de4a99b575,65e034d8-6b12-4536-aad6-f68ef398b140,5b68573a-f0a1-480c-9d23-4e271c17a0ea,a4d504f0-60b6-455c-bd4b-bd84c4ec43bb,680ec761-63cb-43a6-9d25-e2b49e15b2ea,59dec2cf-6b32-4d64-8f21-6b8a1ededf46,ede65bb8-9e68-478d-93ab-fddfb9fdf1aa,e2be1b9e-75ef-4fac-9500-fdca5b2504d8,1b4807ff-6725-4201-9833-e773a1eb37ff,ff8f89c0-9727-4ab2-96c7-103d3e0f55bb,e479376d-0db7-4d53-b0f0-e705c9fb5fad,35319b21-d70d-4a5c-9b7e-4de019a0f121,dc1179e8-43ad-45fe-a254-855f5242e0a4,1a1ce69f-affd-4687-8e22-5c146007659f,38737569-aff4-427f-8260-8ab89d73ac46,380467e1-b942-4f46-9714-84b73ecdc42d,d01855ed-2ad1-41b3-8474-75c85206cc30,666ed0f5-79b0-4f31-b34d-309821660421,ba96606d-edab-49fe-b630-e01ec4966629,52effa98-d7a0-4ba3-bb0c-4e50760551d7,264108d4-6e47-49a9-ac89-42d405750ff6,6d099ca1-a2b1-4d1d-a085-785d216a5c5d,add9b498-d331-4ca1-baf1-560d4574ac19,5aed18ab-8724-4d1a-b93c-3b5455460d40,c210cfc7-caaf-42a4-9c17-c3342bb49d2e,a57d92b4-b8a0-4271-9ae3-c77f09cefd41,6a479c0e-7b4c-4345-829e-f1dc319c825a,8155e3fb-852e-4c06-9aec-30496d2766ad,5c57016f-ad40-4a9b-815e-f52648f6389f";
const targetIds = targetIdsString.split(',');

let openaiConversations = [];
let exportConversations = [];

const groups = [
    {
        title: "First run",
        conversations: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
        title: "Second run",
        conversations: [10, 11, 12, 13],
    },
    {
        title: "Third run",
        conversations: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    },
    {
        title: "Fourth run",
        conversations: [26, 27],
    },
    {
        title: "Fifth run",
        conversations: 'UI&REMAINING',
    }
];

console.log('Filtering conversations...');
for (const conversation of chatLogs) {
    if (targetIds.includes(conversation.conversation_id)) {
        openaiConversations.push(conversation);
    }
}

openaiConversations = openaiConversations.reverse();

function getConversationMessages(conversation, conversationIndex) {
    var messages = [];
    var currentNode = conversation.current_node;
    while (currentNode != null) {
        var node = conversation.mapping[currentNode];
        if (
            node.message &&
            node.message.content
            && node.message.content.parts
            && node.message.content.parts.length > 0 &&
            node.message.content.parts[0].length > 0 &&
            (node.message.author.role !== "system" || node.message.metadata.is_user_system_message)
        ) {
            if (node.message.content.content_type == "text") {
                author = node.message.author.role;
                if (author === "assistant") {
                    author = "ChatGPT";
                }
                messages.push({ author, text: node.message.content.parts[0] });
            }
        } else if (node.message && node.message.content.content_type == 'code') {
            author = "code";
            messages.push({ author, text: node.message.content.text });
        } else if (node.message && node.message.content.content_type == 'execution_output') {
            author = "Output";
            messages.push({ author, text: node.message.content.text });
        }
        currentNode = node.parent;
    }
    messages = messages.reverse();
    for (const message of messages) {
        const messageIndex = messages.indexOf(message);
        message.id = `m-${conversationIndex}-${messageIndex}`;
    }
    return messages;
}

function getConversationMessagesUI(conversationUI, conversationIndex) {
    var messages = [];
    for (const message of conversationUI.messages) {
        let author = message.role;
        if (author === "assistant") {
            author = "ChatGPT";
        }
        messages.push({ author, text: message.content });
    }
    for (const message of messages) {
        const messageIndex = messages.indexOf(message);
        message.id = `m-${conversationIndex}-${messageIndex}`;
    }
    return messages;
}

function getConversation(conversation, index) {
    return {
        id: `c-${index}`,
        title: conversation.title,
        messages: getConversationMessages(conversation, index),
    };
}

function getConversationUI(conversationUI, index) {
    return {
        id: `c-${index}`,
        title: conversationUI.name,
        messages: getConversationMessagesUI(conversationUI, index),
    };
}

console.log('Exporting conversations...');
let lastConversationIndex = 0;
for (const group of groups) {
    const conversationGroup = {
        id: `g-${groups.indexOf(group)}`,
        title: group.title,
        conversations: [],
    };
    if (group.conversations === 'UI&REMAINING') {
        for (const conversation of chatLogsUI) {
            conversationGroup.conversations.push(getConversationUI(conversation, chatLogsUI.indexOf(conversation) + lastConversationIndex));
        }
        for (let i = lastConversationIndex; i < openaiConversations.length; i++) {
            conversationGroup.conversations.push(getConversation(openaiConversations[i], i + chatLogsUI.length));
        }
    } else {
        for (let conversationIndex of group.conversations) {
            conversationGroup.conversations.push(getConversation(openaiConversations[conversationIndex], conversationIndex));
        }
        lastConversationIndex = group.conversations[group.conversations.length - 1] + 1;
    }
    exportConversations.push(conversationGroup);
}

fs.writeFileSync(path.join(__dirname, 'chat-logs.json'), JSON.stringify(exportConversations, null, 4));
console.log('Exported chat-logs.json.');

console.log('Exporting as html...');
let html = '<html><head><meta charset="utf-8"><title>Chat logs</title></head><body>';

for (const group of exportConversations) {
    html += `<h1>${group.title}</h1>`;
    for (const conversation of group.conversations) {
        html += `<div class="conversation" id="${conversation.id}">`;
        html += `<div class="conversation-id">${conversation.id}</div>`;
        html += `<h4>${conversation.title}</h4>`;

        for (const message of conversation.messages) {
            // escape html
            let text = message.text;
            text = text.replace(/&/g, '&amp;');
            text = text.replace(/</g, '&lt;');
            text = text.replace(/>/g, '&gt;');
            text = text.replace(/"/g, '&quot;');
            text = text.replace(/'/g, '&#039;');

            html += `<pre class="message author_${message.author.toLowerCase()}" id="${message.id}">`;
            html += `<a class="message-id" href="#${message.id}">${message.id}</a>`;
            html += `<div class="author">${message.author}</div><div>${text}</div>`;
            html += `</pre>`;
        }

        html += `</div>`;
    }
}

// add the content of the chat-style.css file in style tags
const css = fs.readFileSync(path.join(__dirname, 'chat-style.css'), 'utf8');
html += `<style>${css}</style>`;
html += '</body></html>';

fs.writeFileSync(path.join(__dirname, 'chat-logs.html'), html);
console.log('Exported chat-logs.html.');

console.log('Done.');