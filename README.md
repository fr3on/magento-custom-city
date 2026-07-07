# Custom_City: Magento 2 City & Region Manager

A powerful Magento 2 extension that enhances checkout address forms by converting text inputs for **City** and **Zip/Postal Code** into dynamic, region-dependent dropdown selections. It provides full administrative control over regions, states, cities, and zip codes, including support for bulk CSV imports.

---

## 🌟 Features

* **Dynamic Dropdowns on Checkout & Cart**: Automatically replaces default text fields for City and Zip Code with dropdown selections that filter dynamically based on the selected State/Region.
* **"Not in List" Text Fallbacks**: Configurable text links (e.g., *"City not in list?"*) allowing customers to fall back to manual text entry if their specific location is not pre-populated.
* **Admin Management Suite**:
  * **Manage States/Regions**: Full CRUD management interface for regions.
  * **Manage Cities**: Full CRUD management interface for cities associated with specific regions.
  * **Manage Zip Codes**: Full CRUD management interface for postal/zip codes associated with specific cities.
* **Import Manager**: Bulks import States, Cities, and Zip Codes via CSV uploads directly in the admin panel.
* **Flexible Configuration**: Toggle the extension, custom links, and link titles globally or per store view.

---

## 📁 Repository Structure

```
.
├── Block/           # Admin Grid & Edit blocks
├── Controller/      # Admin and Frontend controller actions
├── Helper/          # Helper classes for configuration settings
├── Model/           # Database Models, Resource Models, and Collections
├── Plugin/          # Address sorting and estimation plugins/preferences
├── Setup/           # Schema Install/Upgrade scripts
├── etc/             # XML configurations (menu, system config, di, routes)
├── registration.php # Component registration file
├── composer.json    # Composer requirements and autoloading settings
├── view/            # Frontend and Adminhtml layouts, templates, and Javascript/CSS files
├── .gitattributes   # Git repository attributes
├── .gitignore       # Git ignored files configuration
└── README.md        # This file
```

---

## 🔧 Installation & Setup

### Manual Installation (app/code)

1. Clone or download this repository.
2. Create the directory structure in your Magento root: `app/code/Custom/City`.
3. Copy the contents of this repository into that folder.

### Register and Enable the Module

Run the following commands in your Magento root directory:

```bash
# Enable the Custom_City module
php bin/magento module:enable Custom_City

# Run setup upgrade to install database tables
php bin/magento setup:upgrade

# Compile dependency injection files
php bin/magento setup:di:compile

# Deploy static view files
php bin/magento setup:static-content:deploy -f

# Clean Magento cache
php bin/magento cache:clean
```

---

## ⚙️ Configuration

In your Magento Admin Panel, navigate to:
**Stores** ➔ **Configuration** ➔ **City & Region Manager** ➔ **General Settings**

Here you can customize:
* **Enable in frontend**: Toggle the dropdown functionality on or off.
* **City not in list link**: Toggle the fallback link below the city dropdown.
* **City not in list link title**: Text displayed for the fallback link (e.g., *"City not in list?"*).
* **Zip not in list link**: Toggle the fallback link below the zip code dropdown.
* **Zip not in list link title**: Text displayed for the zip fallback link (e.g., *"Zip not in list?"*).

---

## 📊 Administration and Importing

### Managing Locations
Navigate to **Region Manager** (left-hand admin menu) to view and manage active records:
* **Manage States**: Add, edit, or delete states/regions.
* **Manage Cities**: View and manage cities linked to states.
* **Manage Zip Codes**: View and manage zip codes linked to cities.

### Importing Data
Navigate to **Region Manager** ➔ **Import Manager**:
* **States Import**: Upload a CSV file to bulk import states.
* **Cities Import**: Upload a CSV file to bulk import cities under states.
* **Zip codes Import**: Upload a CSV file to bulk import zip codes under cities.

### Database Seeding
The module includes built-in seed data for **Egypt (EG)** and **Saudi Arabia (SA)** which automatically populates states/regions and major cities on setup upgrade.

To manually re-seed or seed data on demand, use the CLI command:
```bash
# Seed both Egypt (EG) and Saudi Arabia (SA) locations
php bin/magento custom:city:seed

# Seed a specific country list (e.g. SA only)
php bin/magento custom:city:seed --countries=SA
```