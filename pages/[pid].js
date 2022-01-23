import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function Product(props) {
  const { loadedProduct } = props;

  // if (!loadedProduct) {
  //   return <p>Loading...</p>
  // }

  return (
    <Fragment>
      <h2>{loadedProduct.title}</h2>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const paramsWithIds = data.products.map((product) => ({
    params: { pid: product.id },
  }));
  return {
    paths: paramsWithIds,
    fallback: false,
  };
}
export default Product;
