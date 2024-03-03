from flask import Flask
from flask import request
from mongo.DbConnection import connectToDb
from datetime import datetime

app = Flask(__name__)


@app.route("/api/create", methods=["POST"])
def create():

    # Check request data
    data = request.get_json()

    if (
        data is None
        or "title" not in data
        or "page_saved" not in data
        or "total_pages" not in data
    ):
        return "Invalid request data", 400

    title = data["title"]
    page_saved = data["page_saved"]
    total_pages = data["total_pages"]

    if not isinstance(page_saved, int) or not isinstance(total_pages, int):
        return "Invalid page_saved value", 400

    res, db = connectToDb()
    if res:
        query_res = db.insert_one(
            {
                "title": title,
                "pageSaved": page_saved,
                "totalPages": total_pages,
                "lastOpened": datetime.now(),
            }
        )
        if query_res.acknowledged:
            return "Document created", 200
        else:
            return "Document not found", 404

    else:
        return "Failed to create document"


@app.route("/api/update", methods=["PUT"])
def update():

    # Check request data
    data = request.get_json()

    if data is None or "title" not in data or "page_saved" not in data:
        return "Invalid request data", 400

    title = data["title"]
    page_saved = data["page_saved"]

    if not isinstance(page_saved, int):
        return "Invalid page_saved value", 400

    res, db = connectToDb()
    if res:
        query_res = db.update_one(
            {"title": title},
            {"$set": {"pageSaved": page_saved, "lastOpened": datetime.now()}},
        )
        if query_res.modified_count > 0:
            return "Document updated", 200
        else:
            return "Document not found", 404
    else:
        return "Failed to create document"


@app.route("/api/delete", methods=["DELETE"])
def delete():
    # Check request data
    data = request.get_json()

    if data is None or "title" not in data:
        return "Invalid request data", 400

    title = data["title"]

    res, db = connectToDb()
    if res:
        query_res = db.delete_one({"title": title})
        if query_res.deleted_count > 0:
            return "Document deleted", 200
        else:
            return "Document not found", 404
    else:
        return "Failed to create document"


@app.route("/api/books", methods=["GET"])
def fetchAll():
    res, db = connectToDb()
    if res:
        items = list(
            db.find(
                {},
                {
                    "title": 1,
                    "pageSaved": 1,
                    "totalPages": 1,
                    "_id": 0,
                },
            )
        )

        return items, 200
    else:
        return "Failed to create document"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
