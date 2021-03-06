// Copyright (C) 2013 The Android Open Source Project
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

package com.google.gerrit.server.project;

import com.google.gerrit.extensions.registration.DynamicMap;
import com.google.gerrit.extensions.restapi.RestReadView;
import com.google.gerrit.extensions.restapi.RestView;
import com.google.gerrit.server.EnableSignedPush;
import com.google.gerrit.server.config.AllProjectsName;
import com.google.gerrit.server.config.PluginConfigFactory;
import com.google.gerrit.server.config.ProjectConfigEntry;
import com.google.gerrit.server.git.TransferConfig;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class GetConfig implements RestReadView<ProjectResource> {
  private final boolean serverEnableSignedPush;
  private final TransferConfig config;
  private final DynamicMap<ProjectConfigEntry> pluginConfigEntries;
  private final PluginConfigFactory cfgFactory;
  private final AllProjectsName allProjects;
  private final DynamicMap<RestView<ProjectResource>> views;

  @Inject
  public GetConfig(@EnableSignedPush boolean serverEnableSignedPush,
      TransferConfig config,
      DynamicMap<ProjectConfigEntry> pluginConfigEntries,
      PluginConfigFactory cfgFactory,
      AllProjectsName allProjects,
      DynamicMap<RestView<ProjectResource>> views) {
    this.serverEnableSignedPush = serverEnableSignedPush;
    this.config = config;
    this.pluginConfigEntries = pluginConfigEntries;
    this.allProjects = allProjects;
    this.cfgFactory = cfgFactory;
    this.views = views;
  }

  @Override
  public ConfigInfo apply(ProjectResource resource) {
    return new ConfigInfo(serverEnableSignedPush, resource.getControl(), config,
        pluginConfigEntries, cfgFactory, allProjects, views);
  }
}
