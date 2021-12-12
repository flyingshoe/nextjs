import { Card } from "antd";

const MovieCard = ({ data, loading }) => {
  return (
    <Card
      title={data.title}
      loading={loading}
      hoverable
      /* extra={<span>{data.tomatoes?.rotten}</span>} */
      style={{ width: 300 }}
      cover={<img alt="example" src={data.poster} />}
    >
      <p>{data.plot}</p>
      <p>Metacritic: {data.metacritic}</p>
      <p>Rotten Tomatoes: {data.tomatoes?.rotten}</p>
    </Card>
  );
};

export default MovieCard;
