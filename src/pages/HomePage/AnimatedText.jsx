const AnimatedText = ({ text, className = "", style = {} }) => {
  return (
    <span className={className} style={style}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="letter-animated"
          style={{ animationDelay: `${index * 0.04}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;