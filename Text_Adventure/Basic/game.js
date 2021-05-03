const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

function startGame(){
    state ={}
    showTextNode(1);
}

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    textNode.options.forEach(option => {
        if (showOption(option)){
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add('btn');
            button.addEventListener("click", () => selectOption(option))
            optionButtonsElement.appendChild(button);
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState (state);
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
      return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
      id: 1,
      text: 'You wake up in a bedroom with only a bed and a few items in it. There is a rusty sword and shield on the wall.',
      options: [
        {
          text: 'Take the sword and shield.',
          setState: { swordShield: true },
          nextText: 2
        },
        {
          text: 'Leave the sword and sheild.',
          nextText: 2
        }
      ]
    },
    {
      id: 2,
      text: 'You exit the room. There is a monsterous dragon waiting for you outside.',
      options: [
        {
          text: 'Fight using the sword and shield',
          requiredState: (currentState) => currentState.swordShield,
          setState: { swordShield: false },
          nextText: 3
        },
        {
          text: 'Run down the hall',
          nextText: 4
        }
      ]
    },
    {
      id: 3,
      text: 'After a long fight, you manage to slay the beast, but your sword and shield broke. You pick up a key from the slain beast.',
      options: [
        {
          text: 'Explore the castle',
          setState: {key: true},
          nextText: 5
        },
      ]
    },
    {
      id: 4,
      text: 'You break into a run, hurtling away from the dragon at a breakneck pace. You find an empty room, and you lock the door behind you, hoping it won\'t follow you. In the room, you find another door.',
      options: [
        {
          text: 'Enter the door.',
          nextText: 5
        },
        {
            text: 'Exit the room to see if the dragon has left.',
            nextText: 6
          }
      ]
    },
    {
      id: 5,
      text: 'There\'s a locked door. Do you try and open it?',
      options: [
        {
          text: 'Open it with a key.',
          requiredState: (currentState) => currentState.key,
          setState: { key: false },
          nextText: 7
        },
        {
            text: "Try to open it.",
            nextText: 8
        }
      ]
    },
    {
      id: 6,
      text: 'The dragon is still there, and it burns you to a crisp with its fire.',
      options: [
        {
          text: 'Reset',
          nextText: -1
        }
      ]
    },
    {
      id: 7,
      text: 'You find a room full of gold. Do you take the gold or not?',
      options: [
        {
          text: 'Take the gold',
          nextText: 9
        },
        {
          text: 'Leave the gold',
          nextText: 10
        }
      ]
    },
    {
      id: 8,
      text: 'The door is locked. Because of a magical enchantment, you are sucked into the lock and trapped.',
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 9,
      text: 'You become rich and when you exit the castle, the villiage folk make you their king!',
      options: [
        {
          text: 'Congratulations. Play Again.',
          nextText: -1
        }
      ]
    },
    {
      id: 10,
      text: 'You exit the castle without gold, and you meet up with an old wizard. He praises your lack of greed, and gifts you with a stone. He tell you to rub the stone.',
      options: [
        {
          text: 'Rub the stone',
          nextText: 11
        },
        {
            text: 'Ignore the old man',
            nextText: 12
        }
      ]
    },
    {
      id: 11,
      text: 'You wake up in a cabin in the middle of nowhere, and discover you have magic powers!',
      options: [
        {
          text: 'Congratulations. Play Again.',
          nextText: -1
        }
      ]
    },
    {
        id: 12,
        text: 'The wizard calls you a fool and bewitches you! He turns you into a mouse for the rest of your life.',
        options: [
          {
            text: 'Reset',
            nextText: -1
          }
        ]
      }
  ]

startGame()