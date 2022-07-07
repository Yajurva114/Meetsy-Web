import neo4j from 'neo4j-driver';

const uri = process.env.NEO4J_URI as string;
const username = process.env.NEO4J_USERNAME as string;
const password = process.env.NEO4J_PASSWORD as string;

const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
const session = driver.session();