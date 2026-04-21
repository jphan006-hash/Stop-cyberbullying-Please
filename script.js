const storyText = document.getElementById('story-text');
const optionButtons = document.getElementById('option-buttons');

let state = {};

function startGame() {
    state = {};
    showNode(1);
}

function showNode(nodeIndex) {
    const node = nodes.find(n => n.id === nodeIndex);
    storyText.innerText = node.text;
    
    // Remove old buttons
    while (optionButtons.firstChild) {
        optionButtons.removeChild(optionButtons.firstChild);
    }

    // Add new buttons
    node.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('btn');
        if (option.class) button.classList.add(option.class);
        button.addEventListener('click', () => selectOption(option));
        optionButtons.appendChild(button);
    });
}

function selectOption(option) {
    const nextNodeId = option.nextText;
    if (nextNodeId <= 0) {
        return startGame(); // Restart
    }
    showNode(nextNodeId);
}

const nodes = [
    {
        id: 1,
        text: 'You see a group chat where everyone is making fun of your friend, Sam. What do you do?',
        options: [
            { text: 'Laugh along so they don’t turn on you.', nextText: 2, class: 'bad' },
            { text: 'Private message Sam to see if they are okay.', nextText: 3, class: 'good' },
            { text: 'Tell them to stop in the group chat.', nextText: 4, class: 'good' }
        ]
    },
    {
        id: 2,
        text: 'Sam looks really upset at school. You feel guilty. The bullies notice you didn\'t stand up.',
        options: [
            { text: 'Restart and do the right thing.', nextText: -1 }
        ]
    },
    {
        id: 3,
        text: 'Sam says they are terrified to go online. They want to delete all their social media.',
        options: [
            { text: 'Encourage them to report the messages and take a break.', nextText: 5, class: 'good' },
            { text: 'Tell them to just ignore it, it’s just banter.', nextText: 2, class: 'bad' }
        ]
    },
    {
        id: 4,
        text: 'The group gets silent, and the bully says you are too sensitive. But Sam PMs you to say thanks.',
        options: [
            { text: 'Keep supporting Sam.', nextText: 5, class: 'good' }
        ]
    },
    {
        id: 5,
        text: 'You and Sam report the bullying together and take a break from the phone. You feel closer as friends.',
        options: [
            { text: 'You Win! Play Again?', nextText: -1 }
        ]
    }
];

startGame();
