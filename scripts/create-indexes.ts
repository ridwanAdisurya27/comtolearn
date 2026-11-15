import { client, db } from "../lib/mongodb";

async function main() {
  await db.collection("communities").createIndex({ slug: 1 }, { unique: true });

  await db
    .collection("memberships")
    .createIndex({ communityId: 1, userId: 1 }, { unique: true });
  await db.collection("memberships").createIndex({ userId: 1 });

  await db.collection("paths").createIndex({ communityId: 1 });

  await db
    .collection("progress")
    .createIndex({ userId: 1, pathId: 1 }, { unique: true });

  await db.collection("messages").createIndex({ communityId: 1, createdAt: -1 });

  console.log("Indexes created");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => client.close()); 