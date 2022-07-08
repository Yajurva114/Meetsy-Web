import Error from "../components/error";

export default function Custom404() {
  return <Error statusCode={404} message="Page not found" />;
}