from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


class MongoInstance:
    _instance = None

    def __new__(cls, uri):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.uri = uri
            cls._instance.client = None
            cls._instance.db = None
        return cls._instance

    def connect(self) -> bool:
        if self.client is None:
            self.client = MongoClient(self.uri, server_api=ServerApi("1"))
            self.client.admin.command("ping")
            print("Connected to MongoDB")

            self.db = self.client.get_database("BookTrackerDB").get_collection("books")

        if self.db is not None:
            return True, self.db
        return False, None

    def close(self):
        if self.client is not None:
            self.client.close()
            print("Connection to MongoDB closed")
