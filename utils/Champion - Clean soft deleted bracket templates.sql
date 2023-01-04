DELETE FROM BracketParticipant
 WHERE bracketTemplateId IN (SELECT id FROM BracketTemplate WHERE isDeleted = 1);
 
DELETE FROM BracketTemplate
 WHERE isDeleted = 1;