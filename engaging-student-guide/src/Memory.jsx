import './Memory.css'


const cardImages = [
    {'src': "images/metacog.jpg"},
    {'src': "images/ref.jpg'"},
    {'src': "images/clock.jpg"},
    {'src': "images/brain.jpg"},
    {'src': "images/finals.jpg"},
    {'src': "https://th.bing.com/th?id=OIF.ljB7NofIHqWXfUUV%2fMM5nQ&rs=1&pid=ImgDetMain"},
]

function Memory(){
    const shuffleCards = () => {
        const shuffledCards = [...cardImages,...cardImages]
            .sort(() => Math.random() - 0.5)
    }
    return(<>
        <div className="memory-match">
          <h1>Memory match</h1>
            <button>New Game</button>
        </div>
    </>);
}
export default Memory