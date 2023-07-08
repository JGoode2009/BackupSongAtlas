from dotenv import load_dotenv
# for client_id, and client_token, and refresh token in environment file
import os
# allows manipulation of folders and fetching contents, directory stuff
import base64
# for encoding and decoding
from requests import post, get
# for handling http requests, and import json to parson and send json
import json

load_dotenv()
# making env variables accessible to program
#storing env variables in program
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")


#stored for later use, not sure how to call at this point
refresh_token = 'AQAhh2QT9-Jw4HdlKbP0BKwJnrNVX9FIA291Jmg2qv9LOvP0Tv8zdUYcovu9xChI2FGWOzLQxZBghDGF0iSlcN7OpX3A_WDQxbhPYUjkJFC4TeAKd-TLcKT_NAr9Oazr1QGarjrdCMATJU9glwPMHlivGOzMa8fUaT6-R0GyPZVsAdLSN2avfANWnoN5pw'

# function to to use client id & secret, encode them then send them to get access token
def get_token():
    auth_string = client_id + ":" + client_secret
    # should lookup more about how the encoding process below works, just followed tutorial instructions
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")
    # url that we will pass the information to 
    url = "https://accounts.spotify.com/api/token"
    # headers to provide metadata/instructions about how to understand what is being sent
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"

    }
    data = { "grant_type": "client_credentials"}
    # specific to OAuth 2.0 flows for authentication/authorization
    #grant type is used when client app needs to authenticate itself directly with server to receive access token
    # for POST requests using requests library from python
    result = post(url, headers=headers, data=data)
    # data contains the request from above, post function, posts the variables in paranthesis, result stores
    json_result = json.loads(result.content)
    # json.loads parses the information
    token = json_result["access_token"]
    return token

def get_auth_header(token):
    return {"Authorization": "Bearer " + token}
# apparently the sapce after "Bearer " is required, got a 400 error without it. 


def search_for_artist(token, artist_name):
    url = "https://api.spotify.com/v1/search"
    headers = get_auth_header(token)
    query = f"?q={artist_name}&type=artist&limit=1"

    query_url = url + query
    result = get(query_url, headers=headers)
    #get function = GET method
    json_result = json.loads(result.content)["artists"]["items"]

    if len(json_result) == 0:
        # if there are no results sends the msg below
        print("No artist with this name found")
        return None
    
    return json_result

    # print(json_result)

def get_songs_by_artist(token, artist_id):
    #takes the artist id and passes it to query string to retrieve song list dictionary
    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?country=US"
    headers = get_auth_header(token)
    # stores headrs so they can be passed below
    result = get(url, headers=headers)
    json_result = json.loads(result.content)["tracks"]
    return json_result

# after all that defining now its time for some invoking/calling
token = get_token()
print(token)
result = search_for_artist(token, "Destiny's Child")
artist_id = result[0]["id"]
songs = get_songs_by_artist(token, artist_id)
# print(songs)


# for key in songs:
#     if key == 'name':
#         print(songs[key])

for idx, song in enumerate(songs):
    print(f"{idx + 1}. {song['name']}")

