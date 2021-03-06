﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using MvcApp.Models;
using Newtonsoft.Json;

namespace MvcApp.Tools
{
    public static class Seeder
    {
        public static void Seedit(string jsonData, IServiceProvider serviceProvider)
        {
            List<Music> events = JsonConvert.DeserializeObject<List<Music>>(jsonData);

            using (var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<MvcAppContext>();
                if (!context.Music.Any())
                {
                    context.AddRange(events);
                    context.SaveChanges();
                }
            }
        }
    }
}
