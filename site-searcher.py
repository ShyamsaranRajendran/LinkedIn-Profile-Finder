from googlesearch import search
import time

def generate_query(company, attribute="ceo"):
    return f"{company} {attribute}"

def google_search(query):
    try:
        search_result = next(search(query, num_results=1, lang='en'), None)

        return search_result if search_result else None

    except Exception as e:
        print(f"An error occurred: {e}")
        return None

with open("Responses.txt", "r") as file:
    companies = [line.strip() for line in file.readlines()]

attributes = ["CEO", "CTO", "Director", "CXO", "Vice President", "Sales Head"]

with open("Results.txt", "w") as output_file:
    for company in companies:
        output_file.write(f"Information for {company}:\n")
        for attribute in attributes:
            query = generate_query(company, attribute)
            result = google_search(query)
            if result:
                output_file.write(f"{attribute}: {result}\n")
            else:
                output_file.write(f"No results found for {attribute} of {company}\n")

            time.sleep(10)

        output_file.write("\n")
