import ToDoCard from "./ToDoCard";

function CardContainer({ todos }) {
  return (
    <div className="container" style={{marginTop: 20}}>
      <div className="d-flex justify-content-evenly row">
        {todos.map((todo, i) => (
          <ToDoCard todo={todo} key={i}/>
        ))}
      </div>
    </div>
  );
}

export default CardContainer