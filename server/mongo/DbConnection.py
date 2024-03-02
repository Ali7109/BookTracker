from dotenv import load_dotenv
import os
import time
from mongo.MongoInstance import MongoInstance

load_dotenv()
user = os.getenv('user')
authToken = os.getenv('pass')

if authToken is None:
    raise ValueError('Please set the MONGO_PASS environment variable')

uri = f"mongodb+srv://{user}:{authToken}@clusterinit1.xskf2ay.mongodb.net/?retryWrites=true&w=majority&appName=ClusterInit1"

def connectToDb():
    # Send a ping to confirm a successful connection
    try:
        
        start = time.perf_counter()

        mongoInstance = MongoInstance(uri)
        db = mongoInstance.connect()

        if db:
            print("DB Connected Successfully")
            return db
        else:
            mongoInstance.close()
            print("DB Connection Failed")
            return None
    except Exception as e:
        print(e)
    finally:
        end = time.perf_counter()
        print(f"Connection took {end - start:0.4f} seconds")