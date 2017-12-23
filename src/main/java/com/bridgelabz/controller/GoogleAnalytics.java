 package com.bridgelabz.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.service.GoogleAnalyticService;
import com.google.api.services.analyticsreporting.v4.AnalyticsReporting;
import com.google.api.services.analyticsreporting.v4.model.GetReportsResponse;

@RestController
public class GoogleAnalytics {
	
	@Autowired
	GoogleAnalyticService googleAnalyticService;
	
	@RequestMapping(value="/getGoogleAnalyticEventData", method=RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GetReportsResponse getEventResponse() {
		GetReportsResponse getReportsResponse=null;
		try {
			AnalyticsReporting analyticsReporting = googleAnalyticService.initializeAnalyticsReporting();
			String[] allDimensions= {"ga:pageTitle","ga:eventAction","ga:eventCategory"};
			String[] allMetrics= {"ga:totalEvents"};
			getReportsResponse=googleAnalyticService.getReport(analyticsReporting,"2017-12-19","2017-12-23",allDimensions,allMetrics);
			return getReportsResponse;
		} catch (GeneralSecurityException | IOException e) {
			e.printStackTrace();
			return getReportsResponse;
		} 
	}
	
	@RequestMapping(value="/getGoogleAnalyticPageData", method=RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GetReportsResponse getPageResponse() {
		GetReportsResponse getReportsResponse=null;
		try {
			AnalyticsReporting analyticsReporting = googleAnalyticService.initializeAnalyticsReporting();
			String[] allDimensions= {"ga:pageTitle"};
			String[] allMetrics= {"ga:pageviews","ga:timeOnPage"};
			getReportsResponse=googleAnalyticService.getReport(analyticsReporting,"2017-12-19","2017-12-23",allDimensions,allMetrics);
			return getReportsResponse;
		} catch (GeneralSecurityException | IOException e) {
			e.printStackTrace();
			return getReportsResponse;
		} 
	}	

}
