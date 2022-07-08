import Error from "../components/error";

export default function Custom500() {
  return <Error statusCode={500} message="Internal Server Error" />;
}