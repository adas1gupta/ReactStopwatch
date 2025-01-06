function Lap({ index, time, formatTime }) {
  return (
    <div>
      <p>{`${index + 1}. ${formatTime(time)}`}</p>
    </div>
  );
}

export default Lap;
