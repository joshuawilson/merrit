// Copyright (C) 2014 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.gerrit.extensions.client;

public enum Theme {
  // Light themes
  DEFAULT,
  DAY_3024,
  BASE16_LIGHT,
  ECLIPSE,
  ELEGANT,
  MDN_LIKE,
  NEAT,
  NEO,
  PARAISO_LIGHT,
  SOLARIZED_LIGHT,
  TTCN,
  XQ_LIGHT,
  YETI,

  // Dark themes
  NIGHT_3024,
  ABCDEF,
  AMBIANCE,
  BASE16_DARK,
  BESPIN,
  BLACKBOARD,
  COBALT,
  COLORFORTH,
  DRACULA,
  ERLANG_DARK,
  HOPSCOTCH,
  ICECODER,
  ISOTOPE,
  LESSER_DARK,
  LIQUIBYTE,
  MATERIAL,
  MBO,
  MIDNIGHT,
  MONOKAI,
  NIGHT,
  PARAISO_DARK,
  PASTEL_ON_DARK,
  RAILSCASTS,
  RUBYBLUE,
  SETI,
  SOLARIZED_DARK,
  THE_MATRIX,
  TOMORROW_NIGHT_BRIGHT,
  TOMORROW_NIGHT_EIGHTIES,
  TWILIGHT,
  VIBRANT_INK,
  XQ_DARK,
  ZENBURN;

  public boolean isDark() {
    switch (this) {
      case NIGHT_3024:
      case ABCDEF:
      case AMBIANCE:
      case BASE16_DARK:
      case BESPIN:
      case BLACKBOARD:
      case COBALT:
      case COLORFORTH:
      case DRACULA:
      case ERLANG_DARK:
      case HOPSCOTCH:
      case ICECODER:
      case ISOTOPE:
      case LESSER_DARK:
      case LIQUIBYTE:
      case MATERIAL:
      case MBO:
      case MIDNIGHT:
      case MONOKAI:
      case NIGHT:
      case PARAISO_DARK:
      case PASTEL_ON_DARK:
      case RAILSCASTS:
      case RUBYBLUE:
      case SETI:
      case SOLARIZED_DARK:
      case THE_MATRIX:
      case TOMORROW_NIGHT_BRIGHT:
      case TOMORROW_NIGHT_EIGHTIES:
      case TWILIGHT:
      case VIBRANT_INK:
      case XQ_DARK:
      case ZENBURN:
        return true;
      case DEFAULT:
      case DAY_3024:
      case BASE16_LIGHT:
      case ECLIPSE:
      case ELEGANT:
      case MDN_LIKE:
      case NEAT:
      case NEO:
      case PARAISO_LIGHT:
      case SOLARIZED_LIGHT:
      case TTCN:
      case XQ_LIGHT:
      case YETI:
      default:
        return false;
    }
  }
}
