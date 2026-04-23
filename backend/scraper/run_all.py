from sources.berkeley_city import scrape as berkeley_scrape
from sources.change_berk import scrape as change_berk_scrape
from sources.oakland_city import scrape as oakland_scrape
from sources.change_oak import scrape as change_oak_scrape
from sources.grassroots import scrape as grassroots_scrape
import json
import time

berk = berkeley_scrape()
time.sleep(3)
change_berk = change_berk_scrape()
time.sleep(3)
eastbay = grassroots_scrape()
time.sleep(3)

oak = oakland_scrape()
time.sleep(3)
change_oak = change_oak_scrape()
time.sleep(3)

berkeley_events = berk | change_berk | eastbay
oakland_events = oak | change_oak | eastbay

print("Berkeley events count:", len(berkeley_events))

try:
    with open("backend/data/berkactions.json", "w") as f:
        json.dump(berkeley_events, f, indent=2, default=str)
except Exception as e:
    print("Error writing berk json:", e)

with open("backend/data/oakactions.json", "w") as f:
    json.dump(oakland_events, f, indent=2)