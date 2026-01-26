interface CardProps {
  title: string;
  subtitle: string;
}

const Card = (props: CardProps) => {
  return (
    <div className="p-4 rounded-2xl border-2 border-blue-400 font-normal">
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </div>
  );
};

export default Card;
