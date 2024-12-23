import csv

input_file = r'src/components/csv/provinces__.csv'
output_file = r'src/components/csv/processed_provinces.csv'

# Define the columns to keep
columns_to_keep = ['municipality', 'Column8']

# Read the input CSV file and write the processed data to the output CSV file
with open(input_file, mode='r', newline='', encoding='utf-8') as infile, \
     open(output_file, mode='w', newline='', encoding='utf-8') as outfile:
    
    reader = csv.DictReader(infile)
    writer = csv.DictWriter(outfile, fieldnames=columns_to_keep)
    
    # Write the header to the output file
    writer.writeheader()
    
    # Process each row and write the relevant columns to the output file
    for row in reader:
        processed_row = {col: row[col] for col in columns_to_keep}
        writer.writerow(processed_row)

print(f"Processed CSV saved to {output_file}")