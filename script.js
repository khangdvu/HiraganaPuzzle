
const puzzleCells = document.querySelectorAll('.puzzle-cell')
const alphabetCells = document.querySelectorAll('.alphabet-cell')
const alphabetChart = document.querySelector('.alphabet-chart')
const puzzleChart = document.querySelector('.puzzle-chart')
const startButton = document.getElementById('startButton')
const restartButton = document.getElementById('restartButton')
const puzzleHint = document.querySelector('.puzzle-hint ')
let hiragana = [
    'あ', 'い', 'う', 'え', 'お',
    'か', 'き', 'く', 'け', 'こ',
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も',
    'や',  '' , 'ゆ',  '' , 'よ',
    'ら', 'り', 'る', 'れ', 'ろ',
    'わ',  '' ,  '' ,  '' , 'を',
    'ん', '' ,  '' ,  '' , ''  ]

let romanji = [
    'a', 'i', 'u', 'e', 'o',
    'ka', 'ki', 'ku', 'ke', 'ko',    
    'sa', 'shi', 'su', 'se', 'so',    
    'ta', 'chi', 'tsu', 'te', 'to',    
    'na', 'ni', 'nu', 'ne', 'no',    
    'ha', 'hi', 'fu', 'he', 'ho',    
    'ma', 'mi', 'mu', 'me', 'mo', 
    'ya',  '' , 'yu',  '' , 'yo',
    'ra', 'ri', 'ru', 're', 'ro',  
    'wa',  '' ,  '' ,  '' ,  'wo',  
    'n', '' ,  '' ,  '' , '']


puzzleCells.forEach(puzzleCell => {
    puzzleCell.addEventListener('dragstart', () => {
        puzzleCell.classList.add('dragging')
    })

    puzzleCell.addEventListener('dragend', () => {
        puzzleCell.classList.remove('dragging')
        const droppedAlphabetCell = document.querySelector('.dropped')
        if (compareCells(droppedAlphabetCell, puzzleCell)){
            droppedAlphabetCell.innerText = puzzleCell.innerText
            droppedAlphabetCell.style.backgroundColor = "rgba(119, 185, 111,0.5)"
            puzzleCell.innerText = ''
            puzzleHint.style.visibility = 'hidden'
        }
        droppedAlphabetCell.classList.remove('dropped')
    })
})

alphabetCells.forEach(alphabetCell => {
    alphabetCell.addEventListener('dragover', e => {
        e.preventDefault()
        alphabetCell.classList.add('hover')
    })

    alphabetCell.addEventListener('dragleave', () => {
        alphabetCell.classList.remove('hover')
    })

    alphabetCell.addEventListener('drop', e => {
        e.preventDefault()
        alphabetCell.classList.remove('hover')
        alphabetCell.classList.add('dropped')
    })
})

startButton.addEventListener('click', () => {
    setupPuzzleChart()
})

restartButton.addEventListener('click', () => {
    setupPuzzleChart()
})

function setupPuzzleChart(){
    let currentHiraganaSet = [...hiragana]
    
    for(puzzleCell of puzzleCells){
        if (currentHiraganaSet.length > 0){
            var randomNumber = getRandomNumber(0, currentHiraganaSet.length)
            puzzleCell.innerText = currentHiraganaSet[randomNumber]
            currentHiraganaSet.splice(randomNumber, 1)
        }
    }

    var i = 0
    for(alphabetCell of alphabetCells){
        alphabetCell.innerText = romanji[i]
        alphabetCell.style.backgroundColor = "rgba(255,255,255,0.2)"
        i++
    }
    puzzleHint.style.visibility = 'visible'  
    startButton.style.display = 'none'
    restartButton.style.display = 'flex'     
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function compareCells(alphabetCell, puzzleCell) {
    puzzleIndex = hiragana.indexOf(puzzleCell.innerText)
    alphabetIndex = romanji.indexOf(alphabetCell.innerText)
    console.log(puzzleIndex,alphabetIndex )
    if (puzzleIndex === alphabetIndex){
        return true
    }
    return false
}