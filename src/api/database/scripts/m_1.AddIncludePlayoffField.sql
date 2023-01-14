ALTER TABLE BracketTemplate 
ADD COLUMN "includePlayoff" BIT NOT NULL DEFAULT(0);

ALTER TABLE Tournament 
ADD COLUMN "includePlayoff" BIT NOT NULL DEFAULT(0);