# habitGrapher
a dynamic and customizable habit manager with graphing capabilities.

The goal is to create an app that allows the user to create and monitor events, activities and habits and their recurrence; enabling him/her to track patterns, evolution, increase/decrease in occurrences and graph it.

Features will include :
 -the ability to create varying types of tracked "activities" (eg. habit, workout data, expenses, tasks).
 -set timeframes or recurrence patterns (eg. over a week, every 4 days, everyday, once a month, week days).
 -graph results over custom periods of time.

 Feature details :

  -habit :

    -Set:
      label;
      comment;
      frequency;

    -Get:
      streak;
      ratio (goal/achieved);

  -Task :

    -Set:
      label;
      comment;
      deadline;
      timetable(optional but recommended)((estimated time needed));

    -Get:
      total time used;
      ratio eta/time used;
      recap of past tasks;

  -Workout :

    -Set:
      label;
      comment;
      frequency;
      -exercises:
        sets;
        reps;
        duration;

    -Get:
      streak;
      ratio (goal/achieved);
      standard length;
      total length;
      evolution (reps/week, days missed);

  -Expenses :
    -Set:
      label;
      comment(reason/purpose/origin);
      type;
      amount;
      date(default to current date);

    -Get:
      total by (type ,label ,date, global);
      recurrence by (type ,label);
      tendencies;
