#!/bin/bash

# Define the base folder where the pages will be created
PAGES_DIR="resources/js/pages/Application"

# Create the base folder if it doesn't exist
mkdir -p $PAGES_DIR

# List of pages to generate
PAGES=(
  "About"
  "Cart"
  "CartItem"
  "Contact"
  "Delivery"
  "DeliveryService"
  "DeliveryServiceRate"
  "LocationContinent"
  "LocationDepartment"
  "LocationRegion"
  "LocationRegionType"
  "Motorcycle"
  "MotorcycleBrand"
  "MotorcyclePart"
  "MotorcyclePartDetail"
  "MotorcyclePartCategory"
  "MotorcyclePartQuality"
  "MotorcyclePartType"
  "Order"
  "OrderDetail"
  "OrderItem"
  "OrderStatus"
  "User"
  "Profile"
  "ProfileOrder"
  "CheckoutSuccess"
  "CheckoutFailed"
  "PrivacyPolicy"
  "TermsOfService"
  "RefundPolicy"
  "Welcome"
)

# Function to create the folder structure and files
create_page_structure() {
    PAGE_NAME=$1
    PAGE_DIR="$PAGES_DIR/$PAGE_NAME"
    COMPONENT_NAME="${PAGE_NAME}Page"  # Component name like CartPage, DeliveryPage, etc.

    # Create the folder for the page
    mkdir -p "$PAGE_DIR/Partials"

    # Create the Index.tsx file inside the page folder
    echo "import React from 'react';
import { PageProps } from '@/types'; // Updated import statement

const $COMPONENT_NAME = ({ auth }: PageProps) => {
    return (
        <div>
            <h1>$PAGE_NAME Page</h1>
            <p>This is the $PAGE_NAME page content.</p>
        </div>
    );
};

export default $COMPONENT_NAME;" > "$PAGE_DIR/Index.tsx"

    # Create an example partial file inside the Partials folder
    echo "import React from 'react';

const ExamplePartial = () => {
    return (
        <div>
            <h2>$PAGE_NAME Partial Component</h2>
            <p>This is an example partial component for the $PAGE_NAME page.</p>
        </div>
    );
};

export default ExamplePartial;" > "$PAGE_DIR/Partials/ExamplePartial.tsx"
}

# Generate the folder structure and files for each resource
for PAGE in "${PAGES[@]}"; do
    create_page_structure $PAGE
    echo "Created: $PAGES_DIR/$PAGE"
done

echo "All pages and folder structures have been generated in $PAGES_DIR."
