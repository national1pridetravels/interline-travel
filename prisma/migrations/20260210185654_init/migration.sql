/*
  Warnings:

  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `date` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `package` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `travelers` on the `Booking` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Package` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - Added the required column `amount` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkIn` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persons` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `highlights` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itinerary` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lead";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "persons" INTEGER NOT NULL,
    "checkIn" DATETIME NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "packageId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Booking_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("createdAt", "email", "id", "name", "phone") SELECT "createdAt", "email", "id", "name", "phone" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE TABLE "new_Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "duration" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "highlights" JSONB NOT NULL,
    "itinerary" JSONB NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Package" ("createdAt", "id", "price", "slug", "title") SELECT "createdAt", "id", "price", "slug", "title" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
