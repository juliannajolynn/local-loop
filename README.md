# Julianna Log 4/20/2026: 
# file layout:
# backend -> scraper -> sources -> a .py file for every source (berkeley city, grassroots org, change.org)
#
#      how did I scrape berkeley city: each event on their website has url format (berkeleyca.gov/your-government/city-council/city-council-agendas/city-council-YYYY-MM-DD) so I used that for relevant dates. 
# using [playwrite](https://playwright.dev/) vscode extension to scrape [agendas](https://berkeleyca.gov/your-government/city-council/city-council-agendas)
# by inspecting element their website, I found which html elements correspond to data we need 
# when you get into local-loop in the terminal, source ../venv/bin/activate first 
# to run, python backend/scraper/sources/berkeley_city.py
# backend -> scraper -> run_all.py that runs all the scrapers
# backend -> data -> actions.json is the unified actions for the home page
# frontend -> I'll write it out later, the files are just there rn
#
#
# Julianna Log 4/21/2026: 
# change.org scraping, TO DO: right now, I'm scraping minimum details, for descriptionns and stuff its a lot so would we want a llm to summarize?
# to run: python backend/scraper/sources/change_org.py