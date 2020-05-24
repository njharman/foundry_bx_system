export const registerHandlebarHelpers = function() {

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });
  Handlebars.registerHelper('notfalse', function(value) {
    return value != 0;
  });
  Handlebars.registerHelper('langtolearn', function(value) {
    let left = (value.extra + value.bonus) - value.learned.length;
    if (left > 0) {
      return left;
    }
    return 0;
  });
  Handlebars.registerHelper('setting', function(key) {
    return game.settings.get("bx", key);
  });
  Handlebars.registerHelper('classmechanics', function(value) {
    return value == game.settings.get("bx", "classMechanics");
  });
  Handlebars.registerHelper('thiefmechanics', function(value) {
    return value == game.settings.get("bx", "thiefSkills");
  });
  Handlebars.registerHelper('isequal', function(a, b) {
    return a === b;
  });

}
